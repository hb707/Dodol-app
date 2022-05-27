/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import LastPage from './LastPage';
import Page from './Page';

interface Icarousel {
  navigation: any;
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
}

const Container = styled.View`
  margin-top: 70px;
  height: 80%;
  justify-content: center;
  align-items: center;
`;

const Indicator = styled.View<{ focused: boolean }>`
  margin: 0px 4px;
  background-color: ${(props: { focused: boolean }) =>
    props.focused ? '#262626' : '#dfdfdf'};
  width: 6px;
  height: 6px;
  border-radius: 3px;
`;

const IndicatorWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

function Carousel({ navigation, pages, pageWidth, gap, offset }: Icarousel) {
  const [page, setPage] = useState(0);

  const renderItem = ({ item }: any) => (
    <Page
      navigation={navigation}
      item={item}
      style={{ width: pageWidth, marginHorizontal: gap / 2 }}
    />
  );

  const onScroll = (e: any) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
  };

  return (
    <Container>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.color}`}
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <LastPage
            navigation={navigation}
            style={{
              width: pageWidth,
              height: '100%',
              marginHorizontal: gap / 2,
            }}
          />
        }
      />
      <IndicatorWrapper>
        {Array.from({ length: pages.length }, (_, i) => i).map(i => (
          <Indicator key={`indicator_${i}`} focused={i === page} />
        ))}
      </IndicatorWrapper>
    </Container>
  );
}

export default Carousel;
