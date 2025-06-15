/**
 * The retuned data from API, contains thumbnailUrl but with low reslution 50X50 if figured out that we can achive more high resultion by remove the part after still frame media id.
 */

interface GetResolvedThumbnailUrl {
  thumbnailUrl: string | undefined;
  stillFrameMediaId: string | undefined;
}

export function getResolvedThumbnailUrl({
  thumbnailUrl,
  stillFrameMediaId,
}: GetResolvedThumbnailUrl) {
  let resolvedThumbnailUrl = undefined;

  if (stillFrameMediaId && thumbnailUrl) {
    const thumbnailUrlParts = thumbnailUrl.split(stillFrameMediaId);
    const baseUrl = thumbnailUrlParts[0];

    resolvedThumbnailUrl = `${baseUrl} ${thumbnailUrl}`;
  }

  return resolvedThumbnailUrl;
}
