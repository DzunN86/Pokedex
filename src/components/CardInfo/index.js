import {ListItem} from '@rneui/base';
import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, FONTS} from '../../themes';

const CardInfo = ({icon, topDivider, label, content, edit, onPress}) => {
  return (
    <ListItem topDivider={topDivider}>
      <Icon name={icon} size={20} color={COLORS.lightGray4} />
      <ListItem.Content>
        <ListItem.Subtitle style={styles.label} numberOfLines={1}>
          {label}
        </ListItem.Subtitle>
        <ListItem.Title style={styles.labelTitle}>{content}</ListItem.Title>
      </ListItem.Content>
      {edit && (
        <TouchableOpacity onPress={onPress}>
          <Icon name="create" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      )}
    </ListItem>
  );
};

export default CardInfo;

const styles = StyleSheet.create({
  label: {
    ...FONTS.body4,
    color: COLORS.lightGray,
  },
  labelTitle: {
    ...FONTS.h3,
  },
});
