/* eslint-disable react/no-array-index-key */

import { Fragment } from "react";
import { Text } from "../../components";
import { SummaryList, Anchor } from "./JobDetailSummaryContent.styled";

interface DetailProp {
  title: string;
  content: string | number;
  isLink: boolean;
}

interface JobDetailSummaryProps {
  title?: string;
  className?: string;
  detailList: DetailProp[];
}

const JobDetailSummaryContent = ({ detailList, ...rest }: JobDetailSummaryProps) => (
  <SummaryList {...rest}>
    {detailList.map(({ title, content, isLink }, idx) =>
      isLink ? (
        <Fragment key={`${title}-${idx}`}>
          <Text as="dt" weight="bold">
            {title}
          </Text>
          <Text as="dd">
            <Anchor target="_blank" href={`https://hub.docker.com/r/${content}`} rel="noreferrer">
              {content}
            </Anchor>
          </Text>
        </Fragment>
      ) : (
        <Fragment key={`${title}-${idx}`}>
          <Text as="dt" weight="bold">
            {title}
          </Text>
          <Text as="dd">{content}</Text>
        </Fragment>
      )
    )}
  </SummaryList>
);

export default JobDetailSummaryContent;
