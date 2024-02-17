import React, { useCallback, useMemo } from "react";

import { Dimensions } from "react-native";
import styled from "styled-components/native";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Alphabet } from "@/shared/constants/kana";
import { ILetter, dakuon, handakuon, base, yoon } from "@/shared/data/lettersTable";
import { getLettersWithStatuses } from "@/shared/helpers/kana";
import { toggleLetter, toggleSome } from "@/store/features/kana/slice";
import { RootState } from "@/store/store";

interface EducationKanaTableProps {
  kana: "hiragana" | "katakana";
  type: Alphabet;
  isEditMode?: boolean;
  onClick?: (id: string) => void
  last?: boolean
}

const EducationKanaTable: React.FC<EducationKanaTableProps> = ({
  kana,
  type,
  isEditMode,
  onClick = () => {},
  last
}) => {
  const dispatch = useAppDispatch();

  const getData = useCallback((type: Alphabet) => {
    if (type === "base") return base;
    else if (type === "dakuon") return dakuon;
    else if (type === "handakuon") return handakuon;
    else if (type === "yoon") return yoon;
  }, []);

  const selectedLetters = useAppSelector(
    (state: RootState) => state.kana.selected[type][kana]
  );
  const data = useMemo(() => getData(type), [getData, type]);

  const onToggleLetter = useCallback(
    (letter: ILetter, alphabet: "base" | "dakuon" | "handakuon" | "yoon") => {
      dispatch(
        toggleLetter({
          letter: letter,
          alphabet,
          kana: kana,
        })
      );
    },
    [dispatch, kana]
  );

  const onPress = useCallback(
    (
      val: [cell: ILetter, rowIndex: number, cellIndex: number, type: string]
    ) => {
      onToggleLetter(
        val[0],
        val[3] === "basic"
          ? "base"
          : (val[3] as "base" | "dakuon" | "handakuon" | "yoon")
      );
    },
    [onToggleLetter]
  );

  const onToggleSome = useCallback(
    (
      letters: ILetter[],
      alphabet: "base" | "dakuon" | "handakuon" | "yoon"
    ) => {
      dispatch(
        toggleSome({
          letter: letters,
          alphabet,
          kana: kana,
        })
      );
    },
    [dispatch, kana]
  );

  const onPlus = useCallback(
    (type: "row" | "cell", index: number, alphabet: Alphabet) => {
      const dataMap = {
        base: base,
        dakuon: dakuon,
        handakuon: handakuon,
        yoon: yoon,
      };

      const data = dataMap[alphabet] || [];

      const isILetter = (element: ILetter): element is ILetter => {
        return typeof element === "object";
      };

      const letters: ILetter[] =
        type === "row"
          ? (data[index].filter(isILetter) as ILetter[])
          : (data.flatMap((row) =>
              isILetter(row[index]) ? [row[index]] : []
            ) as ILetter[]);

      onToggleSome(letters, alphabet);
    },
    [onToggleSome]
  );

  const letters = useMemo(
    () => getLettersWithStatuses(data, selectedLetters),
    [data, selectedLetters]
  );

  const screenWidth = Dimensions.get("window").width;

  const itemWidth = (screenWidth / 6) - 15;
  const itemWidthLong = (screenWidth / 3) - (itemWidth / 3) - 23;

  return (
    <Container last={last} >
      {letters.length > 1 && (
        <RowButtons>
          {letters[0].items.map((cell, cellIndex) => {
            return (
              <Cell
                itemWidthLong={itemWidthLong}
                itemWidth={itemWidth}
                isInfo={isEditMode !== true}
                isPlus={isEditMode === true}
                isActive={cell.active}
                isEditMode={isEditMode}
                isLong={letters[0].items.length === 3}
                key={`plus_${cellIndex}`}
                isEmpty={false}
                onPress={() => onPlus?.("cell", cellIndex, type)}
              >
                <Symbol
                  fontSize={isEditMode !== true ? 13 : 22}
                  isInfo={isEditMode !== true}
                  isPlus={isEditMode === true}
                >
                  {isEditMode && "+"}
                  {!isEditMode && "-"}
                  {!isEditMode && cell.data.en.length === 1 && cell.data.en[0]}
                  {!isEditMode && cell.data.en.length === 2 && cell.data.en[1]}
                  {!isEditMode && cell.data.en.length === 3 && cell.data.en[2]}
                </Symbol>
              </Cell>
            );
          })}
        </RowButtons>
      )}

      {letters.map((row, rowIndex) => (
        <Row key={rowIndex}>
          <Cell
            itemWidthLong={itemWidthLong}
            itemWidth={itemWidth}
            isInfo={isEditMode !== true}
            isPlus={isEditMode === true}
            isActive={row.activeInRow}
            isEditMode={isEditMode}
            isLong={false}
            key={`row-${rowIndex}`}
            onPress={() => onPlus?.("row", rowIndex, type)}
          >
            <Symbol
              fontSize={isEditMode !== true ? 13 : 22}
              isInfo={isEditMode !== true}
              isPlus={isEditMode === true}
            >
              {isEditMode && "+"}
              {!isEditMode && "-"}
              {!isEditMode &&
                row.items[0] !== null &&
                (row.items[0].data.en.length < 3
                  ? row.items[0].data.en[0]
                  : row.items[0].data.en[0] + row.items[0].data.en[1])}
            </Symbol>
          </Cell>
          {(
            row.items[0].data.en === "YA" ? [row.items[0], null, row.items[1], null, row.items[2]] :
            row.items[0].data.en === "WA" ? [row.items[0], null, null, null, row.items[1]] : 
            row.items[0].data.en === "N" ? [null, null, row.items[0], null, null] 
            : row.items).map((cell, cellIndex) => {
            return (
              <Cell
              isInfo={false}
              itemWidthLong={itemWidthLong}
              itemWidth={itemWidth}
              isPlus={false}
              isActive={cell !== null && cell.active && isEditMode}
              isEditMode={isEditMode}
              isLong={row.items.length === 3 && row.items[0].data.en !== "YA"}
              key={`${rowIndex}-${cellIndex}`}
              isEmpty={cell === null}
              onPress={() => {
                if (cell !== null) {
                  if (isEditMode) onPress?.([cell.data, rowIndex, cellIndex, type]);
                  else onClick?.(cell.data.id);
                }
              }}
              >
                <Symbol fontSize={17}>
                  {cell !== null && cell.data[kana === "hiragana" ? "hi" : "ka"]}
                </Symbol>
                <SubText>
                  {cell !== null && cell.data.en.toUpperCase()}
                </SubText>
              </Cell>
            );
          })}
        </Row>
      ))}
    </Container>
  );
};

export default EducationKanaTable;


const Container = styled.View<{ last?: boolean }>`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  margin-bottom: 30px;
  gap: 10px;
  margin-bottom: 20px;
  border-bottom-width: ${({ last }) => last ? "0px" : "1px"};
  padding-bottom: 30px;
  border-bottom-color: ${({ theme }) => theme.colors.color2};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

const RowButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
`;

type CellProp = {
  isEmpty?: boolean;
  isLong: boolean,
  isEditMode: boolean | undefined
  isActive: boolean | undefined
  isPlus: boolean

  itemWidth: number
  itemWidthLong: number

  isInfo: boolean
};

const Cell = styled.TouchableOpacity<CellProp>`
  border-radius: 12px;
  border-width: ${({ isEmpty }) => (isEmpty ? 0 : "1px")};
  border-color: ${({ theme, isEmpty, isInfo }) =>
    (isEmpty || isInfo) ? "transparent" : theme.colors.color2};
  width: ${({ isLong, itemWidth, itemWidthLong }) =>
    isLong ? `${itemWidthLong}px` : `${itemWidth}px`};
  height: ${({ itemWidth }) => `${itemWidth}px`};
  background-color: ${({ theme, isPlus, isActive, isEmpty, isInfo }) =>
    (!isActive || isEmpty || isInfo)
      ? "transparent"
      : isPlus
        ? theme.colors.second_color3
        : theme.colors.second_color4};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

type SymbolProps = {
  isInfo?: boolean;
  fontSize: number;

  isPlus?: boolean
};

const Symbol = styled.Text<SymbolProps>`
  font-size: ${({ fontSize }) => fontSize + "px"};
  color: ${({ theme, isInfo, isPlus }) =>
    isPlus
      ? theme.colors.color5
      : isInfo
        ? theme.colors.color3
        : theme.colors.color4};
`;

const SubText = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.color4};
`;