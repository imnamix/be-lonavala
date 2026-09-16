import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { SessionService } from '../shared/services/session.service';

const fs = require('fs');
var appRoot = require('app-root-path');

export class FileEntity {
  entityName: string;
  entityId: string;
}

// init multer & aws-sdk lib
var multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// wasabi s3 config
const wasabiEndpoint = new AWS.Endpoint('s3.wasabisys.com');

const s3 = new AWS.S3({
  endpoint: wasabiEndpoint,
  region: 'us-west-1',
  accessKeyId: process.env.WASSABI_ACCESS,
  secretAccessKey: process.env.WASSABI_SECRET,
});

var storageS3 = multerS3({
  s3: s3,
  bucket: 'pinnacle-test-bucket',
  acl: 'public-read',
  key: function (request, file, callback) {
    let entityName = request.query.entityName
      ? request.query.entityName + '/'
      : '';
    var dir = `gallery/${entityName}`;
    let p1 = Date.now();
    let p2 = Date.now();
    if (process) {
      var hrTime = process.hrtime();
      if (hrTime[0] && hrTime[1]) {
        p2 = hrTime[0] * 1000000000 + hrTime[1];
      }
    }
    const randomName = `${p1}-${p2}`;
    console.log('KEY : ');
    callback(null, `${dir}${randomName}${extname(file.originalname)}`);
  },
  url: function (req, file, cb) {
    console.log('REQ, ', req);
    console.log('FILE : ', file);
  },
});

@Controller('file-uploader')
export class FileUploaderController {
  constructor(private ss: SessionService) {}
  @Post('upload')
  // @UseGuards(new AuthGuard())
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({ name: 'filename', required: true })
  @UseInterceptors(
    FileInterceptor('filename', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let entityName = req.query.entityName || '';
          var dir = `${appRoot}/public/gallery/${entityName}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          return cb(null, dir);
        },
        filename: (req, file, cb) => {
          let entityId = req.query.entityId || '';
          const randomName = '$_$' + entityId + '$_$';
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file, @Body() createCatDto: FileEntity) {
    console.log(file);
    return file.path.split('public/gallery/')[1];
  }

  @Get('file/:entityName/:entityId')
  // @UseGuards(new AuthGuard())
  async serveAvatar(
    @Param('entityName') entityName,
    @Param('entityId') entityId,
    @Res() res,
  ): Promise<any> {
    let fileName = '$_$' + entityId + '$_$';
    let ext = [
      '.png',
      '.jpeg',
      '.jpg',
      '.svg',
      '.csv',
      '.xls',
      '.xlsx',
      '.pdf',
      '.doc',
      '.docx',
    ];
    let finalExt = '';
    for (let i in ext) {
      if (
        fs.existsSync(
          `${appRoot}/public/gallery/${entityName}/` + fileName + '' + ext[i],
        )
      ) {
        finalExt = ext[i];
        break;
      }
    }
    fileName += finalExt;
    res.sendFile(fileName, { root: `${appRoot}/public/gallery/${entityName}` });
  }

  //////// Type 2

  @Post('upload2')
  // @UseGuards(new AuthGuard())
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({ name: 'filename', required: true })
  @UseInterceptors(
    FileInterceptor('filename', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let entityName = req.query.entityName || '';
          var dir = `${appRoot}/public/gallery/${entityName}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          return cb(null, dir);
        },
        filename: (req, file, cb) => {
          const randomName = '$_$' + new Date().getTime() + '$_$';
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload2(
    @UploadedFile() file,
    @Query() query,
    @Body() createCatDto: FileEntity,
  ) {
    let entityName = query.entityName || '';
    let filePath = `${entityName}/${file.filename}`;
    return { success: true, path: filePath };
  }

  @Get('file2')
  // @UseGuards(new AuthGuard())
  async serveAvatar2(@Query() query, @Res() res): Promise<any> {
    let entityName = query.path;
    if (!fs.existsSync(`${appRoot}/public/gallery/${entityName}`)) {
      res.sendFile(entityName, { root: `${appRoot}/public/gallery/` });
    } else {
      if (entityName && entityName.length > 0) {
        res.sendFile(entityName, { root: `${appRoot}/public/gallery` });
      } else {
        res.send({ error: 'filenotfound' });
      }
    }
  }

  //////// Type 2

  @Post('upload4')
  // @UseGuards(new AuthGuard())
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  //@ApiImplicitFile({ name: 'files', required: true })
  @UseInterceptors(
    FilesInterceptor('files[]', 30, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          let entityName = req.query.entityName || '';
          var dir = `${appRoot}/public/gallery/${entityName}`;
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
          }
          return cb(null, dir);
        },
        filename: (req, file, cb) => {
          const randomName = '$_$' + new Date().getTime() + '$_$';
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload4(
    @UploadedFiles() files,
    @Query() query,
    @Param() SessionService,
    @Body() createCatDto: FileEntity,
  ) {
    let entityName = query.entityName || '';
    //let filePath = `${entityName}/${file.filename}`;
    let filePaths = [];
    files.forEach((element) => {
      let doc = {
        originalName: element.originalname,
        filename: element.filename,
        fileType: element.mimetype,
        size: element.size,
        date: new Date(),
        role: this.ss.get().role,
        id: this.ss.get().id,
      };
      filePaths.push(doc);
    });
    return { success: true, files: filePaths };
  }

  @Post('uploadS3')
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiQuery({
    name: 'entityName',
    description: 'Provide entity name',
  })
  @UseInterceptors(
    FilesInterceptor('files', 30, {
      storage: storageS3,
    }),
  )
  async uploadS3(@UploadedFiles() files, @Req() req) {
    let filePaths = [];
    console.log('Files : ', files);
    files.forEach((element) => {
      let doc = {
        originalName: element.originalname,
        filename: element.key,
        fileType: element.mimetype,
        size: element.size,
        date: new Date(),
        access_url: element.location,
      };
      filePaths.push(doc);
    });
    return { success: true, files: filePaths };
  }

  @Get('downloadS3')
  // @UseGuards(new AuthGuard())
  async getS3Url(@Query() query, @Res() res): Promise<any> {
    const baseUrl = `https://s3.us-west-1.wasabisys.com/${process.env.WASABI_BUCKET}/`;
    let entityName = query.path;
    const fileUrl = `${baseUrl}${entityName}`;
    var params = {
      Key: `${entityName}`,
      Bucket: process.env.WASABI_BUCKET,
    };
    try {
      const fileStream = s3.getObject(params).createReadStream();
      fileStream.pipe(res);
    } catch (error) {
      res.send({ error: 'File Not Found' });
    }
  }
}
