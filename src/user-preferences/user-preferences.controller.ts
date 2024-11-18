// import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
// import { UserPreferencesService } from './user-preferences.service';

// @Controller('api/preferences')
// export class UserPreferencesController {
//     constructor(private readonly userPreferencesService: UserPreferencesService) { }

//     @Post()
//     create(@Body() createUserPreferenceDto: any) {
//         return this.userPreferencesService.create(createUserPreferenceDto);
//     }

//     @Get(':userId')
//     findOne(@Param('userId') userId: string) {
//         return this.userPreferencesService.findOne(userId);
//     }

//     @Patch(':userId')
//     update(@Param('userId') userId: string, @Body() updateUserPreferenceDto: any) {
//         return this.userPreferencesService.update(userId, updateUserPreferenceDto);
//     }

//     @Delete(':userId')
//     remove(@Param('userId') userId: string) {
//         return this.userPreferencesService.remove(userId);
//     }
// }
import { Controller, Post, Get, Patch, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { CreateUserPreferenceDto } from './dto/create-user-preference.dto';
import { UpdateUserPreferenceDto } from './dto/update-user-preference.dto';

@Controller('api/preferences')
export class UserPreferencesController {
    constructor(private readonly userPreferencesService: UserPreferencesService) { }

    @Post()
    async create(@Body() createUserPreferenceDto: CreateUserPreferenceDto) {
        try {
            const preference = await this.userPreferencesService.create(createUserPreferenceDto);
            return { statusCode: HttpStatus.CREATED, message: 'User preference created successfully', data: preference };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Failed to create user preference', error: error.message }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':userId')
    async findOne(@Param('userId') userId: string) {
        try {
            const preference = await this.userPreferencesService.findOne(userId);
            if (!preference) {
                throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'User preference not found' }, HttpStatus.NOT_FOUND);
            }
            return { statusCode: HttpStatus.OK, message: 'User preference retrieved successfully', data: preference };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to retrieve user preference', error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':userId')
    async update(@Param('userId') userId: string, @Body() updateUserPreferenceDto: UpdateUserPreferenceDto) {
        try {
            const updatedPreference = await this.userPreferencesService.update(userId, updateUserPreferenceDto);
            if (!updatedPreference) {
                throw new HttpException({ statusCode: HttpStatus.NOT_FOUND, message: 'User preference not found' }, HttpStatus.NOT_FOUND);
            }
            return { statusCode: HttpStatus.OK, message: 'User preference updated successfully', data: updatedPreference };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.BAD_REQUEST, message: 'Failed to update user preference', error: error.message }, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':userId')
    async remove(@Param('userId') userId: string) {
        try {
            await this.userPreferencesService.remove(userId);
            return { statusCode: HttpStatus.OK, message: 'User preference deleted successfully' };
        } catch (error) {
            throw new HttpException({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Failed to delete user preference', error: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
