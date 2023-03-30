import { Controller, Get } from "@nestjs/common";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {
    constructor(private readonly tagSerive: TagService) {}

    @Get()
    findAll(){
        return this.tagSerive.findAll();
    }
}