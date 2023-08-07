import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.gray,
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const SelectOption = ({ setOrderDirection, setOrderBy }) => {
	const [selected, setSelected] = useState('latest');

	const handleSelect = (value) => {
		setSelected(value);

		switch (value) {
			case 'latest':
				setOrderDirection('DESC');
				setOrderBy('CREATED_AT');
				break;
			case 'highest':
				setOrderDirection('DESC');
				setOrderBy('RATING_AVERAGE');
				break;
			case 'lowest':
				setOrderDirection('ASC');
				setOrderBy('RATING_AVERAGE');
				break;
			default:
				setOrderDirection('DESC');
				setOrderBy('CREATED_AT');
				break;
		}
	};

	return (
		<Picker
			selectedValue={selected}
			onValueChange={(itemValue) => {
				handleSelect(itemValue);
			}}
		>
			<Picker.Item label='Latest repositories' value={'latest'} />
			<Picker.Item label='Highest rated repositories' value={'highest'} />
			<Picker.Item label='Loswest rated repositories' value={'lowest'} />
		</Picker>
	);
};

const RepositoryList = () => {
	// const [orderDirection, setOrderDirection] = useState('DESC');
	// const [orderBy, setOrderBy] = useState('CREATED_AT');

	const { repositories, refetch, setOrderDirection, setOrderBy } =
		useRepositories();

	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	// useEffect(() => {
	// 	setOrder(orderDirection, orderBy);
	// }, [orderBy]);

	return (
		<FlatList
			data={repositoryNodes}
			ListHeaderComponent={
				<SelectOption
					setOrderDirection={setOrderDirection}
					setOrderBy={setOrderBy}
				/>
			}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <RepositoryItem item={item} />}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default RepositoryList;
