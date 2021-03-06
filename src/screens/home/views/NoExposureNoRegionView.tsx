import React, {useCallback} from 'react';
import {Linking} from 'react-native';
import {Text, Box, Button, LastCheckedDisplay} from 'components';
import {useNavigation} from '@react-navigation/native';
import {useI18n} from '@shopify/react-i18n';
import {Theme} from 'shared/theme';

import {BaseHomeView} from '../components/BaseHomeView';

type Color = keyof Theme['colors'];

export const NoExposureNoRegionView = () => {
  const [i18n] = useI18n();

  const titleTextColor = 'bodyTitleWhite';
  const bodyTextColor = 'bodyTextWhite';

  const titleColor: Color = titleTextColor as Color;
  const textColor: Color = bodyTextColor as Color;

  const onAction = useCallback(() => {
    Linking.openURL(i18n.translate('Home.GuidanceUrl')).catch(err => console.error('An error occurred', err));
  }, [i18n]);

  const navigation = useNavigation();
  const onRegion = useCallback(() => navigation.navigate('RegionSelect'), [navigation]);

  return (
    // note you can add an icon i.e. <BaseHomeView iconName="icon-offline>
    <BaseHomeView>
      <Text variant="bodyTitle" color={titleColor} marginBottom="l" accessibilityRole="header">
        {i18n.translate('Home.NoExposureDetected.NoRegionSetTitle')}
      </Text>
      <Text variant="bodyText" color={textColor} marginBottom="l">
        {i18n.translate('Home.NoExposureDetected.NoRegionSetBody')}
      </Text>

      <LastCheckedDisplay />

      <Box alignSelf="stretch" marginBottom="l">
        <Button text={i18n.translate('Home.ChooseRegionCTA')} variant="opaqueGrey" onPress={onRegion} />
      </Box>
      <Box alignSelf="stretch" marginBottom="l">
        <Button text={i18n.translate('Home.How')} variant="opaqueGrey" externalLink onPress={onAction} />
      </Box>
    </BaseHomeView>
  );
};
