import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let loader: HarnessLoader;
  let fixture: ComponentFixture<ChildComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ChildComponent],
    });

    fixture = TestBed.createComponent(ChildComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(inputs.length).toBe(4);

      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      expect(checkboxes.length).toBe(3);

      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons.length).toBe(2);

      const slider = await loader.getHarness(MatSliderHarness);
      expect(slider).not.toBeNull();
    });

    test('Then initial value of slider thumb is 0', async () => {
      const thumb = (await loader.getHarness(MatSliderHarness)).getEndThumb();
      expect(await (await thumb).getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const inputMax = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      await inputMax.setValue('109');

      const slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const checkbox = (await loader.getAllHarnesses(MatCheckboxHarness))[2];
      await checkbox.toggle();

      const slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const inputStep = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await inputStep.setValue('5');

      const fowardButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_forward_ios' }),
      );

      await fowardButton.click();
      await fowardButton.click();

      const thumb = (await loader.getHarness(MatSliderHarness)).getEndThumb();
      expect(await (await thumb).getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const inputValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      const inputStep = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const buttonBack = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_back_ios' }),
      );

      await inputValue.setValue('5');
      await inputStep.setValue('6');
      await buttonBack.click();

      expect(await inputValue.getValue()).toBe('5');
    });
  });
});
