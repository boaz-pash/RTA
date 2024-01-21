import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from  '../../../main-server/src/trpc/appRouter';
 
export const trpc = createTRPCReact<AppRouter>();