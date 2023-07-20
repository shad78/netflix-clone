export const API_KEY: string = "0bfc99ad44bf81fba91038f70592836f";
export const TMDB_BASE_URL: string = "https://api.themoviedb.org/3";

class TuringQueue<T> {
  private data: T[] = [];

  push = (item: T) => this.data.push(item); 
  pop(): T | undefined {
    return this.data.shift();
  }
}

const turingQueue = new TuringQueue<number>();
turingQueue.push(0);
// turingQueue.push("1"); // Remove this line to avoid pushing a string
console.log(turingQueue);

    