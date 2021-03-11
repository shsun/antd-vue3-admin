import { defineComponent, onMounted, PropType } from 'vue';
import { Area } from '@antv/g2plot';
import * as uuid from 'uuid';
import './index.less';

interface Field {
  x: string | number;
  y: string | number;
}

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    height: {
      type: [String, Number],
      default: '46px',
    },
    data: {
      type: Array as PropType<Field[]>,
      default: () => [],
    },
    formatter: {
      type: Function,
    },
  },
  setup(props) {
    const produceId = props.id || uuid.v4();

    onMounted(() => {
      const options: any = {
        data: props.data,
        xField: 'x',
        yField: 'y',
        xAxis: false,
        yAxis: false,
        autoFit: true,
      };
      if (props.formatter) {
        options.tooltip = {
          formatter: props.formatter,
        };
      }
      const area = new Area(produceId, options);
      area.render();
    });

    return () => (
      <div class="antv-chart-mini">
        <div class="chart-wrapper" style={{ height: props.height }}>
          <div id={produceId} style="width: 100%;height: 100%;"></div>
        </div>
      </div>
    );
  },
});