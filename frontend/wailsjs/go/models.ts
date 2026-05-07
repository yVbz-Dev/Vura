export namespace main {
	
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

