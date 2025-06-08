export const selectResponse = (state) => state.groups.response;

export const selectDetail = (state, groupId) =>
  state.groups.detail?.[groupId] ?? null;

export const selectLoading = (state) => state.groups.loading;

export const selectError = (state) => state.groups.error;
