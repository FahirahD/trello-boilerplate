import { Application } from '@/declarations';
import users from './users/users.service';
import boards from './boards/boards.service';
import tasks from './tasks/tasks.service';
import columns from './columns/columns.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(boards);
  app.configure(tasks);
  app.configure(columns);
}
