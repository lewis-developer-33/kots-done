import {blockContent} from './schemaTypes/blockContent'
import { college } from './schemaTypes/college'
import { course } from './schemaTypes/course'
import { department } from './schemaTypes/department'
import { notice } from './schemaTypes/notice'
import { role } from './schemaTypes/role'
import { school } from './schemaTypes/school'
import { semester } from './schemaTypes/semester'
import {user} from './schemaTypes/user'

export const schema = {
  types: [college, school, department,course,semester,role,user,blockContent,notice],
}
