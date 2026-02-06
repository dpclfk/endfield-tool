export const onlyInteger = (value: string): number => {
  // 숫자만 남기고 제거
  const number = value.replace(/[^0-9]/g, "");

  // 빈 값이면 0으로, 아니면 숫자로 변환
  return number === "" ? 0 : Number(number);
};

export const onlyFloat = (value: string): number => {
  // 숫자와 소수점 남기고 제거
  const number = value.replace(/[^0-9.]/g, "");

  // 여러번 입력된 소수점 제거하고 맨앞하나만 남기기
  const float = number.replace(/(\..*)\./g, "$1");
  // return +number;
  return float === "" ? 0 : Number(float);
};
