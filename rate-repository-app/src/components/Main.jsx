import { View, StyleSheet, StatusBar } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Navigate, Route, Routes } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryPage from './RepositoryPage';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
	container: {
		// marginTop: Constants.statusBarHeight,
		flexGrow: 1,
		flexShrink: 1,
		backgroundColor: theme.colors.gray,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<StatusBar backgroundColor={theme.colors.darker} />
			<AppBar />
			<Routes>
				<Route path='/' element={<RepositoryList />} />
				<Route path='/singin' element={<SignIn />} />
				<Route
					path='/:id'
					element={
						<>
							<RepositoryPage />
						</>
					}
				/>
				<Route path='signup' element={<SignUp />} />
				<Route path='/review' element={<ReviewForm />} />
				<Route path='/myreviews' element={<MyReviews />} />
				<Route path='*' element={<Navigate to={'/'} replace />} />
			</Routes>
		</View>
	);
};

export default Main;
