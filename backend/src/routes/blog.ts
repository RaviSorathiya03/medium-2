import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { Bindings } from "hono/types";
import { blogInputs, blogUpdates} from "@ravivvaniya/ravi";

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
        
    }
    Variables: {
        userId: number
    }
}>()

blogRouter.use('/*', async(c, next)=>{
    try{
        const authHeader = c.req.header("authorization") || " "
    const response = await verify(authHeader, c.env.JWT_SECRET)
    if(response){
        c.set("userId", response.id as number );
        await next();
    } else{
        c.status(500)
        return c.json({
            message: "Something went wrong"
        })
    }
    } catch(e){
        c.status(403)
        return c.json({
            message: "you are not logged in"
        })
    }
   
})

blogRouter.get('/', (c) => {
    return c.text('Hello Hono!')
  })
  
blogRouter.post('/', async(c)=>{
    const body = await c.req.json();
    const success  = blogInputs.safeParse(body)
    if(!success){
        c.status(500)
        return c.json({
            message: "something went wrong"
        })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})
  
blogRouter.put('/:id', async(c)=>{
    const id = await c.req.param("id");
    const body = await c.req.json();
    const success = blogUpdates.safeParse(body)
    if(!success){
        c.status(500)
        return c.json({
            message: "something went wrong"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id: Number(id)
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
  })

  blogRouter.get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.blog.findMany({
        select:{
            content: true,
            title: true,
            id: true,
            author: {
                select:{
                    name: true
                }
            }
        }
    });
    return c.json({

        blog
    })
  })
  
blogRouter.get('/:id', async(c)=>{
    try{
        const body = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.findFirst({
        where:{
            id: Number(body)
        },
        select: {
            content: true,
            title: true,
            author:{
                select:{
                    id: true,
                    name: true
                }
            }
        }
    })

    return c.json({
       blog
    })
    } catch(e){
        c.status(411)
        return c.json({
            message: "something went wrong"
        })
    }
  
  })
  
