class LiveBoard {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.genX = this._emptyArray()
        this.genY = this._emptyArray()
        this.genNumber = 0;
    }

    _emptyArray() {
        var result = new Array(this.height);
        for(var i=0; i<this.height; i++) {
            result[i] = new Array(this.width);
        }
        return result;
    }

    randomize() {
        this.genNumber = 0;
        for(var i=0; i<this.height; i++) {
            for(var j=0; j<this.width; j++) {
                this.genX[i][j] = (Math.random() > 0.5) ? 1 : 0;
            }
        }
    }
    clear() {
        this.genNumber = 0;
        for(var i=0; i<this.height; i++) {
            for(var j=0; j<this.width; j++) {
                this.genX[i][j] = 0;
            }
        }
    }
    getCell(x,y){
        return this.genX[x][y];
    }
    invertCell(x,y) {
        x=Math.floor(x)
        y=Math.floor(y)
        this.genX[x][y] = (this.genX[x][y]+1)%2
    }
    getNexCellStatus(x,y) {
        var curState = this.genX[x][y];


        var xIndexes = [x-1,x, x+1];
        var yIndexes = [y-1, y, y+1];
        if(x==0)
            xIndexes[0]=this.width-1;
        if(x==this.width-1)
            xIndexes[2] = 0;

        if(y==0)
            yIndexes[0]=this.height-1;
        if(y==this.height-1)
            yIndexes[2] = 0;

        var neighbours = this.genX[xIndexes[0]][yIndexes[0]] + 
            this.genX[xIndexes[0]][yIndexes[1]] + 
            this.genX[xIndexes[0]][yIndexes[2]] + 
            this.genX[xIndexes[1]][yIndexes[0]] + 
            this.genX[xIndexes[1]][yIndexes[2]] + 
            this.genX[xIndexes[2]][yIndexes[0]] + 
            this.genX[xIndexes[2]][yIndexes[1]] + 
            this.genX[xIndexes[2]][yIndexes[2]];

        return (neighbours == 3 || (neighbours+curState) == 3)?1:0;
    }
    nextGen() {
        var tmp = this.genX;
        for(var i=0; i<this.height; i++) {
            for(var j=0; j<this.width; j++) {
                this.genY[i][j] = this.getNexCellStatus(i,j);
            }
        }

        this.genX = this.genY;
        this.genY = tmp;
        this.genNumber++;
    }

    putArray(x, y, shape) {
        x=Math.floor(x)
        y=Math.floor(y)
        for(var i=0; i<shape.length; i++) {
            for(var j=0; j<shape[0].length; j++) {
                this.genX[(y+i)%this.height][(x+j)%this.width] = shape[i][j];
            }
        }
    }
}

