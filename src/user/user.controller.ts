import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "@app/user/user.service";
import { CreateUserDto } from "@app/user/dto/createUser.dto";
import { UserResponseInterface } from "@app/user/types/userResponse.interface";
import { LoginUserDto } from "@app/user/dto/loginUser.dto";
import { Request } from "express";
import { ExpressRequest } from "@app/types/expressRequest.interface";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponse(user);
    }

    @Get()
    async currentUser(@Req() request: ExpressRequest): Promise<UserResponseInterface> {
        return this.userService.buildUserResponse(request.user);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginDto)
        return this.userService.buildUserResponse(user)
    }
}