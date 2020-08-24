import { controller, httpGet, httpPost, request, requestParam, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import fs from 'fs';
import { VideoApi } from '../models/video-api.model';
import { inject } from 'inversify';
import TYPES from '../constants/types';
import { VideoService } from '../services/video.service';
import * as stream from 'stream';

@controller('/video')
export class VideoController {

    constructor(@inject(TYPES.VideoService) private readonly videoService: VideoService) {
    }

    @httpGet('/')
    public getAll(@request() request: Request, @response() res: Response): Promise<VideoApi[]> {
        return this.videoService.getAllVideos();
    }

    @httpPost('/')
    public async addVideo(@request() request: Request, @response() res: Response): Promise<VideoApi> {
        let video: VideoApi = null;

        try {
            video = await this.videoService.newVideo(request.body);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }

        return video;
    }


    @httpGet('/:id')
    public async getVideoInformation(@requestParam("id") id: string, @request() request: Request, @response() res: Response): Promise<VideoApi> {
        return this.videoService.getApiVideo(id);
    }

    @httpGet('/thumbnail/:id')
    public async getThumbnail(@requestParam("id") id: string, @request() request: Request, @response() res: Response): Promise<void> {
        const video = await this.videoService.getVideo(id);
        console.log('thumbnail requested', video)

        const fullPath = `assets/images/${video.thumbnailFileName}`;
        const file = fs.createReadStream(fullPath)
        const ps = new stream.PassThrough();

        stream.pipeline(
            file,
            ps,
            (err) => {
                if (err) {
                    console.log(err);
                    return res.sendStatus(400);
                }
            })

        const head = {
            'Content-Type': 'image/png',
        };
        res.writeHead(200, head);
        ps.pipe(res);
    }

    @httpGet('/data/:id')
    public async getVideoData(@requestParam("id") id: string, @request() request: Request, @response() res: Response): Promise<void> {
        const video = await this.videoService.getVideo(id);
        console.log('video requested')
        const fullPath = `assets/videos/${video.fileName}`;
        const stat = fs.statSync(fullPath);
        const fileSize = stat.size;
        const range = request.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(fullPath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(fullPath).pipe(res);
        }
    }
}
