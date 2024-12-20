import LessonCreate from "@/components/ui/lessonCmp/LessonCreate";
import { getSingleLessonApi } from "@/services/commonApi/lesson.api";
import { Box } from "@mui/material";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { data: lesson } = (await getSingleLessonApi(id)) || {};

  const obj = {
    name: lesson.name,
    number: lesson.number,
    photo: lesson?.photoURL,
    photoPreview: lesson.photoURL,
    _id: lesson._id,
    reason: lesson?.reason,
  };

  return (
    <Box>
      <LessonCreate defaultValue={obj} />
    </Box>
  );
};

export default Page;
