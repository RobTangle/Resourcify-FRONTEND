export const NAME_ACCESS_TOKEN = "access_token_resourcify";

export function header(accessToken) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
}
