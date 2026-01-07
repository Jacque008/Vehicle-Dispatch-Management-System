import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { TestsModule } from './tests/tests.module';
import { AvailabilityModule } from './availability/availability.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
      context: ({ req }) => ({ req }),
    }),

    // Database
    PrismaModule,

    // Feature modules
    AuthModule,
    DriversModule,
    TestsModule,
    AvailabilityModule,
    AssignmentsModule,
    NotificationsModule,
    JobsModule,
  ],
})
export class AppModule {}
