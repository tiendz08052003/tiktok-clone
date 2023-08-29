//Thư viện request
import * as httpRequest from '~/utils/httpRequest';

// handle axios
export const getFollowing = async (page, perPage) => {
  try {
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        perPage,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
