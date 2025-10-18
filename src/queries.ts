import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const baseUrl = "http://localhost:3500";
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer " +
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4ODI4MTAzMS0xZmEwLTRiNjctOWQ2My1mM2JlYjU2MzRlY2YiLCJlbWFpbCI6ImFsaXR3aW40MDRAZ21haWwuY29tIiwiaWF0IjoxNzYwNzM2OTcwLCJleHAiOjE3NjE5NDY1NzB9.UZFqvyA0IB71FnyC854x-VzG9lmaZ1ipOrVwTinjvDo`,
};

const getAllCardsKey = "cards";
export const getAllCards = (): UseQueryResult<AxiosResponse<any>, Error> =>
  useQuery({
    queryKey: [getAllCardsKey],
    queryFn: () =>
      axios.get(`${baseUrl}/decks/cards`, {
        headers,
      }),
  });

export const addCardMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ word, note }: { word: string; note: string }) =>
      axios.post(
        `${baseUrl}/decks/cards`,
        {
          word: word,
          note: note,
        },
        { headers },
      ),
    onSuccess: () => {
      toast.success("Word added to vocabulary");
      queryClient.invalidateQueries({ queryKey: [getAllCardsKey] });
      onSuccess();
    },
    onError: () => {
      toast.error("Failed to add word to vocabulary");
      onError();
    },
  });
};
