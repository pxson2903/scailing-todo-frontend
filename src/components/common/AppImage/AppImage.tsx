import { FunctionComponent } from 'react';
import NextImage, { ImageProps } from 'next/image';

interface AppImageProps extends Omit<ImageProps, 'alt'> {
  alt?: string;
}

const AppImage: FunctionComponent<AppImageProps> = ({
  title,
  alt = title ?? 'Image',
  height = 256,
  width = 256,
  ...restOfProps
}) => {
  return (
    <NextImage
      alt={alt}
      height={height}
      title={title}
      unoptimized={true}
      width={width}
      {...restOfProps}
    />
  );
};

export default AppImage;
