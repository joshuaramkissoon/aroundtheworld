export interface Narration {
  id: string;
  story_id: string;
  audio_url: string;
  meta: {
    description: string;
    [key: string]: any;
  };
  created_at?: string;
  updated_at?: string;
}