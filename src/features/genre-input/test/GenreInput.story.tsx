import { useForm } from "react-hook-form";
import { GenreInput } from "../ui/GenreInput";

export const TestWrapper = ({
  onSubmit = () => {},
  initialGenres = [],
}: {
  onSubmit?: (data: { genres: string[] }) => void;
  initialGenres?: string[];
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      genres: initialGenres,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid="test-form">
      <GenreInput
        name="genres"
        control={control}
        label="Test Genres"
        placeholder="Type to search genres"
        required
      />
      <button type="submit" data-testid="submit-button">
        Submit
      </button>
    </form>
  );
};
