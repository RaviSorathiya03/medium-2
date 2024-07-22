
import AppBar from './AppBar';
import { Blog } from '../hooks';
import { Avatar } from './BlogCard';

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-12 max-w-screen-xl w-full">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">
              {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
              Posted On 3rd Dec 2023
            </div>
            <div className="pt-4">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-lg font-bold text-slate-500 text-lg">Author</div>
            <div className="flex items-center mt-4 gap-4 w-full">
              <div>
              <Avatar size={6} name={blog.author.name} />
              </div>
              <div className="ml-4">
                <div className="text-xl font-bold">
                  {blog.author.name}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catchphrase about the author's ability to grab the attention of people.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullBlog;
