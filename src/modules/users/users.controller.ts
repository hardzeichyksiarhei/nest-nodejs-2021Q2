import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiOperation } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';

import { User } from './user.entity';

@ApiResponse({ status: 401, description: 'Unauthorized' })
@ApiResponse({ status: 403, description: 'Forbidden' })
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ResponseUserDto,
  })
  @ApiOperation({ summary: 'Create one User 👻' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return User.toResponse(user);
  }

  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: [ResponseUserDto],
  })
  @ApiOperation({ summary: 'Retrieve many Users 👻' })
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map(User.toResponse);
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ResponseUserDto,
  })
  @ApiOperation({ summary: 'Retrieve one User 👻' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return User.toResponse(user);
  }

  @ApiResponse({
    status: 200,
    description: 'The updated record',
    type: ResponseUserDto,
  })
  @ApiOperation({ summary: 'Update one User 👻' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);
    return User.toResponse(user);
  }

  @ApiResponse({
    status: 200,
    description: 'The deleted record',
    type: ResponseUserDto,
  })
  @ApiOperation({ summary: 'Delete one User 👻' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    return User.toResponse(user);
  }
}
