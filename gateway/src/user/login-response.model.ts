import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => User, { nullable: true })
  user: User | null;

  @Field({ nullable: true })
  access_token?: string;
}