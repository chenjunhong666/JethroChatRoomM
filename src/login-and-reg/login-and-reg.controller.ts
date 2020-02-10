import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service'
import { ApiTags, ApiBearerAuth, ApiResponse, ApiOperation} from '@nestjs/swagger';
import {LoginParameDto} from '../common/dto/loginParame'
// import {TokenPayload} from '../common/class/tokenPayload'
@ApiBearerAuth()
@ApiTags('login')
@Controller()
export class LoginAndRegController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UsersService) { }

    @ApiResponse({ status: 0, description: '登录成功,并返回token'})
    @ApiResponse({ status: 1, description: '账号或密码错误'})
    @ApiOperation({description:"登录接口,成功将返回token"})
    @Post('login')
    async login(@Body() loginParameDto:LoginParameDto) {
        const user = await this.authService.validateUser(loginParameDto.username, loginParameDto.password);
        if (!user) {
            return { code: 1, message: "账号或密码错误" };
        }
        const token = await this.authService.login(user);
        return { ...token, code: 0 };
    }

    @Post('logout')
    @ApiResponse({ status: 0, description: '注销成功'})
    @ApiResponse({ status: 1, description: '注销失败'})
    @ApiOperation({description:"注销接口"})
    @UseGuards(AuthGuard())
    async Logout(@Req()req) {
        // const payload : TokenPayload = req.user;
        // console.log(payload)
        return {code: 0};
    }

    @Post('judge')
    @ApiResponse({ status: 0, description: '已登录'})
    @ApiResponse({ status: 1, description: '未登录'})
    @ApiOperation({description:"判断是否登录"})
    @UseGuards(AuthGuard())
    async judge(@Req()req) {
        // const payload : TokenPayload = req.user;
        // console.log(payload)
        return {code: 0};
    }
}
