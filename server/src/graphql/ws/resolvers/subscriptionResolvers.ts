import { activeTrackService } from "../../../services/activeTrack.service";

export const subscriptionResolvers = {
  Subscription: {
    activeTrackChanged: {
      subscribe: async function* () {
        while (true) {
          const track: string = await new Promise((resolve) => {
            const handler = (track: string) => {
              activeTrackService.off("trackChanged", handler);
              resolve(track);
            };
            activeTrackService.on("trackChanged", handler);
          });
          yield track;
        }
      },
      resolve: (payload: string) => payload,
    },
  },
};
