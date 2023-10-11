import { TagResponse } from "@/types/API/tag/TagResponse";

interface ITagClient {
  fetchTagsByGenreId(genreId: number): Promise<TagResponse[]>;
}

export default ITagClient;
