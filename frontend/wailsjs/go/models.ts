export namespace main {
	
	export class Config {
	    VimMode: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Config(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.VimMode = source["VimMode"];
	    }
	}
	export class FileData {
	    Name: string;
	    Content: string;
	    Path: string;
	
	    static createFrom(source: any = {}) {
	        return new FileData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Name = source["Name"];
	        this.Content = source["Content"];
	        this.Path = source["Path"];
	    }
	}

}

