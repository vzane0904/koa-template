import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers'
@Controller('/not')
export class UserController {
  @Get('/login')
  getAll() {
    return 'This action returns all users'
  }

  @Get('pic_validate_code')
  getOne(@Param('id') id: number) {
    console.log(id)
    // 由于id被声明为number,将自动抛出"number"类型
  }
}
