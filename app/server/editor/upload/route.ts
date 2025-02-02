import { supabase } from '@/app/supabase';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as Blob;
  const fileName = formData.get('fileName') as string;

  if (!file || !fileName) {
    return new Response(JSON.stringify({ error: 'File or fileName missing' }), { status: 400 });
  }

  const { data, error } = await supabase.storage
    .from('uploads')
    .upload(fileName, file, {
      contentType: file.type,
    });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  const { data: publicUrlData } = supabase.storage.from('uploads').getPublicUrl(fileName);

  return new Response(JSON.stringify({ publicUrl: publicUrlData?.publicUrl }), { status: 200 });
}
