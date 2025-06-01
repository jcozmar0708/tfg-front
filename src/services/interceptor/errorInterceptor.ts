import ApiResponseError from "../../models/ApiResponseError";

const redirectToError = (status: number) => {
  window.location.assign(`/error?status=${status}`);
};

export const handleErrors = async (response: Response): Promise<void> => {
  if (response.ok) return;

  switch (response.status) {
    case 401: {
      const currentPath = window.location.pathname;

      if (currentPath === "/login") {
        const error = await response.json();
        throw new ApiResponseError(error.message);
      }

      sessionStorage.clear();
      window.location.assign("/login");
      throw new ApiResponseError();
    }

    case 403:
      redirectToError(403);
      throw new ApiResponseError();

    case 400:
    case 404: {
      const error = await response.json();
      throw new ApiResponseError(error.message);
    }

    default:
      redirectToError(response.status);
      try {
        const errorBody = await response.json();
        throw new Error(errorBody);
      } catch {
        throw new Error();
      }
  }
};

export const handleUnexpectedError = (error: unknown) => {
  redirectToError(500);
};
