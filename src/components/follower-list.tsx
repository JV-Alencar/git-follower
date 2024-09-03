import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserItem } from './user-item';

export interface Props {
  userName: string;
}

export function FollowerList({ userName }: Props) {
  const [followers, setFollowers] = useState<any[]>([]);

  useEffect(() => {
    fetchFollowers(userName);
  }, [userName]);

  async function fetchFollowers(userName: string) {
    const res = await fetch(`https://api.github.com/users/${userName}/followers`);
    const data = await res.json();
    setFollowers(data);
  }

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={(e) => {}}><UserItem userName={item.login}/></TouchableOpacity>
  );

  return (
    <FlatList
      data={followers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    marginVertical: 16,
  },
});
