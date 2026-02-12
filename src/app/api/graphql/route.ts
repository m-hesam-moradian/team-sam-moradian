import { createYoga, createSchema } from 'graphql-yoga';
import { lessonAdapter } from '@/adapters/lesson.adapter';

// 1. The Schema (The Menu)
// We tell GraphQL exactly what a Lesson looks like.
const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Lesson {
      _id: String!
      title: String!
      order: Int
    }

    type Query {
      # The "lessons" query returns an array of Lessons
      lessons: [Lesson!]!
    }
  `,
  // 2. The Resolvers (The Waiters)
  // This is the proper way: we don't write DB logic here.
  // We simply call the Adapter we already built.
  resolvers: {
    Query: {
      lessons: async () => {
        console.log('📝 GraphQL Waiter is asking the Lesson Adapter for data...');
        return await lessonAdapter.list();
      },
    },
  },
});

// 3. The Setup
// This handles the GET and POST requests from the browser
const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  // Next.js 16 requires this to handle the global Response object
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
