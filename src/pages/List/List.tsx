import React from 'react';
import { useDispatch } from 'react-redux';
import { LayoutContentsStyled } from '../../components/Layout/styled/MainLayout.styled';
import { selectAllTodos, selectTodosFetchingStatus } from '../../data/slices/todos/selectors';
import { fetchTodosAction } from '../../data/slices/todos/todosSlice';
import { useTypedSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import TodosList from './components/TodosList';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useTypedSelector(selectAllTodos);
  const token = useTypedSelector((state: RootState) => state.authentication.accessToken);
  const fetchingStatus = useTypedSelector(selectTodosFetchingStatus);

  React.useEffect(() => {
    if (fetchingStatus === 'idle' && token) {
      dispatch(fetchTodosAction({ token, data: undefined }));
    }
  }, [fetchingStatus]);

  if (fetchingStatus !== 'succeeded') {
    return <h3>Loading</h3>;
  }

  return (
    <LayoutContentsStyled>
      <TodosList todos={todos} />
    </LayoutContentsStyled>
  );
};

export default List;
