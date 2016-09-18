import 'fabric/dist/fabric';

export interface Drawable {
  getFabricObject():fabric.IObject;
  draw(time:number, docWidth: number, docHeight: number);
}
