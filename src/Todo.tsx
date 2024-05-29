import {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const Todo = () => {
  const [todoList, setTodoList] = useState<any[]>([]);
  const [todo, setTodo] = useState<string>('');

  const handleChange = (text: string) => {
    setTodo(text);
  };

  const handleAddTodo = () => {
    setTodoList(prev => [...prev, todo]);
    setTodo('');
  };

  const handleDeleteToDo = (index: any) => {
    const todoFilter = todoList.filter((item, idx) => {
      return idx !== index;
    });
    setTodoList(todoFilter);
  };

  const handleEdit = (index: any) => {
    const todoFilter = todoList.filter((item, idx) => {
      if (idx === index) {
        handleDeleteToDo(index);
        setTodo(item);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.header}>Set Your Daily Task</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputValue}
            placeholder="Enter daily task.."
            onChangeText={handleChange}
            value={todo}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {todoList.length <= 0 ? (
          <Text style={styles.nohting}> Set Your Daily Goal !!!!</Text>
        ) : (
          <Text> </Text>
        )}
        <FlatList
          style={styles.flatList}
          data={todoList}
          renderItem={({item, index}) => (
            <View
              style={{
                ...styles.toDoList,
                borderBottomColor:
                  index === todoList.length - 1 ? 'transparent' : 'black',
              }}>
              <Text style={{color: 'black'}}>{item}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteToDo(index)}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(index)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item: any, index: any) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
  },
  header: {
    fontSize: 30,
    fontFamily: 'Arial',
    color: '#003135',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingLeft: 45,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputValue: {
    marginTop: 10,
    borderColor: 'black',
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    color: '#024950',
    fontSize: 19,
    position: 'relative',
  },

  addButton: {
    backgroundColor: '#0FA4AF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    position: 'absolute',
    right: 5,
    top: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#AFDDE5',
    marginTop: 20,
    borderRadius: 10,
  },
  toDoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  deleteButton: {
    backgroundColor: '#964734',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 130,
  },
  deleteButtonText: {
    color: 'white',
  },
  editButton: {
    backgroundColor: '#0FA4AF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  editText: {
    color: 'white',
  },
  nohting: {
    fontSize: 30,
    color: 'black',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginLeft: 20,
  },
});
