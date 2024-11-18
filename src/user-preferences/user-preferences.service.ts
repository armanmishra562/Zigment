import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './models/user-preference.model';

@Injectable()
export class UserPreferencesService {
    constructor(
        @InjectModel('UserPreference') private userPreferenceModel: Model<UserPreference>,
    ) { }

    async create(createUserPreferenceDto: any): Promise<UserPreference> {
        const newUserPreference = new this.userPreferenceModel(createUserPreferenceDto);
        return await newUserPreference.save();
    }

    async findOne(userId: string): Promise<UserPreference> {
        const userPreference = await this.userPreferenceModel.findOne({ userId });
        if (!userPreference) {
            throw new NotFoundException(`User preference with ID ${userId} not found`);
        }
        return userPreference;
    }

    async update(userId: string, updateUserPreferenceDto: any): Promise<UserPreference> {
        const updatedUserPreference = await this.userPreferenceModel.findOneAndUpdate(
            { userId },
            updateUserPreferenceDto,
            { new: true },
        );
        if (!updatedUserPreference) {
            throw new NotFoundException(`User preference with ID ${userId} not found`);
        }
        return updatedUserPreference;
    }

    async remove(userId: string): Promise<any> {
        const result = await this.userPreferenceModel.deleteOne({ userId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`User preference with ID ${userId} not found`);
        }
    }
}
