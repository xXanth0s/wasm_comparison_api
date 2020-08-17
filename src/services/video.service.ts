import { inject, injectable } from 'inversify';
import { MongoDBClient } from '../utils/mongodb/client';
import TYPES from '../constants/types';
import { VideoApi } from '../models/video-api.model';
import { Video } from '../models/video.model';

@injectable()
export class VideoService {

    private readonly collectionName = 'Videos';

    constructor(@inject(TYPES.MongoDBClient) private readonly mongoClient: MongoDBClient) {
    }

    public async getAllVideos(): Promise<VideoApi[]> {
        const videos = await this.mongoClient.find<Video>(this.collectionName);
        return videos.map(this.mapVideo);
    }

    public async newVideo(video: Video): Promise<VideoApi> {
        const finalVideo: Video = {
            ...video,
            dateAdded: new Date(),
        }

        const newVideo = await this.mongoClient.insert<Video>(this.collectionName, finalVideo);
        return this.mapVideo(newVideo);
    }

    public async getApiVideo(videoId: Video['_id']): Promise<VideoApi> {
        const video = await this.getVideo(videoId);
        return this.mapVideo(video);
    }

    public getVideo(videoId: Video['_id']): Promise<Video> {
        return this.mongoClient.findOneById(this.collectionName, videoId);
    }

    private mapVideo(video: Video): VideoApi {
        const {_id, description, title} = video;
        return {
            id: _id,
            description,
            title
        }
    }
}
