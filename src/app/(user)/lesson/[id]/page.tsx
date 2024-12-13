import { getVocabByLessonApi } from "@/services/commonApi/vocab.api";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const lessonVocab = await getVocabByLessonApi(id);

  redirect(`/lesson/${id}/${lessonVocab?.data[0]?._id}`);
};

export default Page;
