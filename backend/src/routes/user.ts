import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInputs, signinInputs } from "@ravivvaniya/ravi";
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL:string
      JWT_SECRET: string
    }
  }>();

userRouter.post('signup', async(c)=>{
  
    const Body = await c.req.json();
    const success = signupInputs.safeParse(Body)
    if(!success){
      c.status(500)
      return c.json({
        message: "something went wrong"
      })
    }
  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try{
     const user = await prisma.user.create({
      data :{
        username: Body.username,
        name: Body.name,
        password: Body.password
      }
    })
    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)
    return c.text(jwt)
  } catch(e){
    c.status(411)
    return c.text("Invalid")
  }
  
  })
  
  userRouter.post('signin', async(c)=>{
    const Body = await c.req.json();
    const success = signinInputs.safeParse(Body)
    if(!success){
      c.status(500)
      return c.json({
        message: "something went wrong"
      })
    }
    
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
       const user = await prisma.user.findFirst({
        where :{
          username: Body.username,
          password: Body.password
        }
      })
      if(!user){
        c.status(403)
        return c.json({
          message: "invalid credentials"
        })
      }
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET)
      return c.text(jwt)
    } catch(e){
      c.status(411)
      return c.text("Invalid")
    }
  })