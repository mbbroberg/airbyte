import React, { useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import TreeView from "components/TreeView";
import { Cell, Header, LightCell } from "components/SimpleTableComponents";
import { SyncSchema } from "core/domain/catalog";
import Search from "./Search";

type IProps = {
  schema: SyncSchema;
  onChangeSchema: (schema: SyncSchema) => void;
};

const TreeViewContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.greyColor0};
  margin-bottom: 29px;
  border-radius: 4px;
`;

const SchemaHeader = styled(Header)`
  min-height: 28px;
  margin-bottom: 5px;
`;

const SchemaView: React.FC<IProps> = ({ schema, onChangeSchema }) => {
  const hasSelectedItem = useMemo(
    () => schema.streams.some((streamNode) => streamNode.config.selected),
    [schema.streams]
  );

  const onCheckAll = useCallback(() => {
    const allSelectedValues = !hasSelectedItem;

    const newSchema = schema.streams.map((streamNode) => {
      return {
        ...streamNode,
        config: { ...streamNode.config, selected: allSelectedValues },
      };
    });

    onChangeSchema({ streams: newSchema });
  }, [hasSelectedItem, onChangeSchema, schema.streams]);

  return (
    <>
      <SchemaHeader>
        <Cell flex={2}>
          <Search onCheckAll={onCheckAll} hasSelectedItem={hasSelectedItem} />
        </Cell>
        <LightCell>
          <FormattedMessage id="form.dataType" />
        </LightCell>
        <LightCell>
          <FormattedMessage id="form.cleanedName" />
        </LightCell>
        <LightCell>
          <FormattedMessage id="form.primaryKey" />
        </LightCell>
        <LightCell>
          <FormattedMessage id="form.cursorField" />
        </LightCell>
        <LightCell>
          <FormattedMessage id="form.syncSettings" />
        </LightCell>
      </SchemaHeader>
      <TreeViewContainer>
        <TreeView schema={schema} onChangeSchema={onChangeSchema} />
      </TreeViewContainer>
    </>
  );
};

export default SchemaView;
