import { Switch } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import styled from 'styled-components';

// 이렇게 파일을 만들고, app.tsx 안에서 react-router-dom 으로부터 import 했던
// Switch object 를, 이걸로 수정.

// A workaround to make test pass
const SwitchComponent =
  process.env.NODE_ENV === 'test' ? Switch : AnimatedSwitch;
const glide = (val: number) =>
  spring(val, {
    stiffness: 174,
    damping: 24,
  });
const mapStyles = (styles: any) => ({
  transform: `translateX(${styles.offset}%)`,
});
const MyAnimatedSwitch = styled(SwitchComponent).attrs(() => ({
  atEnter: { offset: 100 },
  atLeave: { offset: glide(-100) },
  atActive: { offset: glide(0) },
  mapStyles,
}))`
  position: relative;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  > div {
    position: absolute;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }
`;
export default MyAnimatedSwitch;