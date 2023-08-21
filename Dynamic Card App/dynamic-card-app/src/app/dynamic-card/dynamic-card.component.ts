import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicCardService } from '../dynamic-card.service';
import { DynamicCard } from '../models/dynamic-card-model';

@Component({
  selector: 'app-dynamic-card',
  templateUrl: './dynamic-card.component.html',
  styleUrls: ['./dynamic-card.component.css'],
})
export class DynamicCardComponent implements OnInit {
  commentForm!: FormGroup;
  occupationAgreed: boolean = false;
  turnOverRentAgreed: boolean = false;
  gurrentedScheduleAgreed: boolean = false;
  serviceChargeScheduleAgreed: boolean = false;
  afterQueryModalCardName!: string;

  OccupationDynamicCardDatas: DynamicCard[] = [];
  TurnOverRentDynamicCardDatas: DynamicCard[] = [];
  GurrentedScheduleDynamicCardDatas: DynamicCard[] = [];
  ServiceChargeScheduleDynamicCardDatas: DynamicCard[] = [];
  cardsToDisplay: DynamicCard[] = [];

  page = 1;
  pageSize = 4;
  collectionSize!: number;

  constructor(
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef,
    private dynamicCardService: DynamicCardService
  ) {
    this.OccupationDynamicCardDatas = [];
    this.TurnOverRentDynamicCardDatas = [];
    this.GurrentedScheduleDynamicCardDatas = [];
    this.ServiceChargeScheduleDynamicCardDatas = [];
  }

  ngOnInit(): void {
    this.initializeFormNameForm();
    this.GetAllData();
  }

  handleIconEyeClick(): void {
    console.log('eye clicked');
  }

  GetAllData(): void {
    this.cardsToDisplay = [];
    this.dynamicCardService
      .getAll('fa958bf7-9d40-4192-b8ef-6057b67a8a28')
      .subscribe(
        (response: DynamicCard[]) => {
          // Filter cards based on sectionType
          const occupationCards = response.filter(
            (item) => item.sectionType === 'Occupation'
          );
          const turnOverRentCards = response.filter(
            (item) => item.sectionType === 'TurnOverRent'
          );
          const gurrentedScheduleCards = response.filter(
            (item) => item.sectionType === 'GurrentedSchedule'
          );
          const serviceChargeScheduleCards = response.filter(
            (item) => item.sectionType === 'ServiceChargeSchedule'
          );

          if (occupationCards.length > 0) {
            this.OccupationDynamicCardDatas = occupationCards;
            this.collectionSize = this.OccupationDynamicCardDatas.length;
            this.refreshDynamicCardData();
            this.cdr.detectChanges();
            this.occupationAgreed = this.OccupationDynamicCardDatas.slice(-1)[0].agree;

            console.log(this.OccupationDynamicCardDatas);
          }

          if (turnOverRentCards.length > 0) {
            this.TurnOverRentDynamicCardDatas = turnOverRentCards;
            this.collectionSize = this.TurnOverRentDynamicCardDatas.length;
            this.refreshDynamicCardData();
            this.cdr.detectChanges();
            this.turnOverRentAgreed = this.TurnOverRentDynamicCardDatas.slice(-1)[0].agree;
          }

          if (gurrentedScheduleCards.length > 0) {
            this.GurrentedScheduleDynamicCardDatas = gurrentedScheduleCards;
            this.collectionSize = this.GurrentedScheduleDynamicCardDatas.length;
            this.refreshDynamicCardData();
            this.cdr.detectChanges();
            this.gurrentedScheduleAgreed = this.GurrentedScheduleDynamicCardDatas.slice(-1)[0].agree;
          }

          if (serviceChargeScheduleCards.length > 0) {
            this.ServiceChargeScheduleDynamicCardDatas =
              serviceChargeScheduleCards;
            this.collectionSize =
              this.ServiceChargeScheduleDynamicCardDatas.length;
            this.refreshDynamicCardData();
            this.cdr.detectChanges();
            this.serviceChargeScheduleAgreed = this.ServiceChargeScheduleDynamicCardDatas.slice(-1)[0].agree;
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  handleIconQueryClick(icon: string): void {
    this.commentForm.get('comment')?.enable();
    console.log(icon);
    console.log(this.OccupationDynamicCardDatas);
    if (icon === 'Occupation') {
      this.cardsToDisplay = this.OccupationDynamicCardDatas.filter(
        (item) => !item.agree
      );

      this.occupationAgreed =
        this.OccupationDynamicCardDatas.length > 0
          ? this.OccupationDynamicCardDatas[
              this.OccupationDynamicCardDatas.length - 1
            ].agree
          : false;

      // Disable the comment form if occupationAgreed is true
      if (this.occupationAgreed) {
        this.commentForm.get('comment')?.disable();
      } else {
        this.commentForm.get('comment')?.enable();
      }
    }

    if (icon === 'TurnOverRent') {
      this.cardsToDisplay = this.TurnOverRentDynamicCardDatas.filter(
        (item) => !item.agree
      );

      this.turnOverRentAgreed =
        this.TurnOverRentDynamicCardDatas.length > 0
          ? this.TurnOverRentDynamicCardDatas[
              this.TurnOverRentDynamicCardDatas.length - 1
            ].agree
          : false;

      // Disable the comment form if occupationAgreed is true
      if (this.turnOverRentAgreed) {
        this.commentForm.get('comment')?.disable();
      } else {
        this.commentForm.get('comment')?.enable();
      }
    }

    if (icon === 'GurrentedSchedule') {
      this.cardsToDisplay = this.GurrentedScheduleDynamicCardDatas.filter(
        (item) => !item.agree
      );

      this.gurrentedScheduleAgreed =
        this.GurrentedScheduleDynamicCardDatas.length > 0
          ? this.GurrentedScheduleDynamicCardDatas[
              this.GurrentedScheduleDynamicCardDatas.length - 1
            ].agree
          : false;

      // Disable the comment form if occupationAgreed is true
      if (this.gurrentedScheduleAgreed) {
        this.commentForm.get('comment')?.disable();
      } else {
        this.commentForm.get('comment')?.enable();
      }
    }

    if (icon === 'ServiceChargeSchedule') {
      this.cardsToDisplay = this.ServiceChargeScheduleDynamicCardDatas.filter(
        (item) => !item.agree
      );

      this.serviceChargeScheduleAgreed =
        this.ServiceChargeScheduleDynamicCardDatas.length > 0
          ? this.ServiceChargeScheduleDynamicCardDatas[
              this.ServiceChargeScheduleDynamicCardDatas.length - 1
            ].agree
          : false;

      // Disable the comment form if occupationAgreed is true
      if (this.serviceChargeScheduleAgreed) {
        this.commentForm.get('comment')?.disable();
      } else {
        this.commentForm.get('comment')?.enable();
      }
    }

    this.afterQueryModalCardName = icon;
  }

  initializeFormNameForm() {
    this.commentForm = this.formBuilder.group({
      dynamicCardId: [null],
      comment: ['', Validators.required],
    });
  }

  handleIconClick(icon: string): void {
    if (icon === 'Occupation') {
      this.occupationAgreed = !this.occupationAgreed;
      console.log('Hello');
      if (this.occupationAgreed == true) {
        const dynamicCardData: DynamicCard = {
          sectionType: 'Occupation',
          agree: this.occupationAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value || '',
        };

        this.addDataToBackend(dynamicCardData);
        this.commentForm.get('comment')?.disable();
        this.occupationAgreed = true;
      }
    }
    if (icon === 'TurnOverRent') {
      this.turnOverRentAgreed = !this.turnOverRentAgreed;
      console.log('Hello');
      if (this.turnOverRentAgreed == true) {
        const dynamicCardData: DynamicCard = {
          sectionType: 'TurnOverRent',
          agree: this.turnOverRentAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value || '',
        };

        console.log(dynamicCardData);

        this.addDataToBackend(dynamicCardData);
        this.commentForm.get('comment')?.disable();
        this.turnOverRentAgreed = true;
      }
    }
    if (icon === 'GurrentedSchedule') {
      this.gurrentedScheduleAgreed = !this.gurrentedScheduleAgreed;
      console.log('Hello');
      if (this.gurrentedScheduleAgreed == true) {
        const dynamicCardData: DynamicCard = {
          sectionType: 'GurrentedSchedule',
          agree: this.gurrentedScheduleAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value || '',
        };

        this.addDataToBackend(dynamicCardData);
        this.commentForm.get('comment')?.disable();
        this.gurrentedScheduleAgreed = true;
      }
    }
    if (icon === 'ServiceChargeSchedule') {
      this.serviceChargeScheduleAgreed = !this.serviceChargeScheduleAgreed;
      console.log('Hello');
      if (this.serviceChargeScheduleAgreed == true) {
        const dynamicCardData: DynamicCard = {
          sectionType: 'ServiceChargeSchedule',
          agree: this.serviceChargeScheduleAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value || '',
        };

        console.log(dynamicCardData);

        this.addDataToBackend(dynamicCardData);
        this.commentForm.get('comment')?.disable();
        this.serviceChargeScheduleAgreed = true;
      }
    }
  }

  addFormName() {
    if (this.afterQueryModalCardName === 'Occupation') {
      if (this.commentForm.valid) {
        const dynamicCardData: DynamicCard = {
          sectionType: this.afterQueryModalCardName,
          agree: this.occupationAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value,
        };

        this.addDataToBackend(dynamicCardData);
      } else {
        console.log('Invalid form');
      }
    }
    if (this.afterQueryModalCardName === 'TurnOverRent') {
      if (this.commentForm.valid) {
        const dynamicCardData: DynamicCard = {
          sectionType: this.afterQueryModalCardName,
          agree: this.turnOverRentAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value,
        };

        this.addDataToBackend(dynamicCardData);
      } else {
        console.log('Invalid form');
      }
    }
    if (this.afterQueryModalCardName === 'GurrentedSchedule') {
      if (this.commentForm.valid) {
        const dynamicCardData: DynamicCard = {
          sectionType: this.afterQueryModalCardName,
          agree: this.gurrentedScheduleAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value,
        };

        this.addDataToBackend(dynamicCardData);
      } else {
        console.log('Invalid form');
      }
    }
    if (this.afterQueryModalCardName === 'ServiceChargeSchedule') {
      if (this.commentForm.valid) {
        const dynamicCardData: DynamicCard = {
          sectionType: this.afterQueryModalCardName,
          agree: this.serviceChargeScheduleAgreed ? true : false,
          createdBy: 'Awais',
          comment: this.commentForm.get('comment')?.value,
        };

        this.addDataToBackend(dynamicCardData);
      } else {
        console.log('Invalid form');
      }
    }
  }

  handlePageChange(newPage: number) {
    this.page = newPage;
    this.refreshDynamicCardData();
  }

  handlePageSizeChange(newPageSize: number) {
    this.pageSize = newPageSize;
    this.refreshDynamicCardData();
  }

  refreshDynamicCardData() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    if (this.afterQueryModalCardName === 'Occupation') {
      this.cardsToDisplay = this.OccupationDynamicCardDatas;

      this.cardsToDisplay = this.OccupationDynamicCardDatas.slice(
        startIndex,
        endIndex
      );
    }

    if (this.afterQueryModalCardName === 'TurnOverRent') {
      this.cardsToDisplay = this.TurnOverRentDynamicCardDatas;

      this.cardsToDisplay = this.TurnOverRentDynamicCardDatas.slice(
        startIndex,
        endIndex
      );
    }

    if (this.afterQueryModalCardName === 'GurrentedSchedule') {
      this.cardsToDisplay = this.GurrentedScheduleDynamicCardDatas;

      this.cardsToDisplay = this.GurrentedScheduleDynamicCardDatas.slice(
        startIndex,
        endIndex
      );
    }

    if (this.afterQueryModalCardName === 'ServiceChargeSchedule') {
      this.cardsToDisplay = this.ServiceChargeScheduleDynamicCardDatas;

      this.cardsToDisplay = this.ServiceChargeScheduleDynamicCardDatas.slice(
        startIndex,
        endIndex
      );
    }
  }

  handleViewCloseIconClick() {
    this.commentForm.reset();
  }

  automaticallyAddDataInList(response: DynamicCard): void {
    if (response.sectionType === 'Occupation') {
      const existingIndex = this.OccupationDynamicCardDatas.findIndex(
        (field) => field.dynamicCardId === response.dynamicCardId
      );

      if (existingIndex === -1) {
        this.OccupationDynamicCardDatas = [
          ...this.OccupationDynamicCardDatas,
          response,
        ];
      } else {
        this.OccupationDynamicCardDatas = [
          ...this.OccupationDynamicCardDatas.slice(0, existingIndex),
          response,
          ...this.OccupationDynamicCardDatas.slice(existingIndex + 1),
        ];
      }

      this.collectionSize = this.OccupationDynamicCardDatas.length;
      this.refreshDynamicCardData();
      this.cdr.detectChanges();

      this.commentForm.reset();
    }

    if (response.sectionType === 'TurnOverRent') {
      const existingIndex = this.TurnOverRentDynamicCardDatas.findIndex(
        (field) => field.dynamicCardId === response.dynamicCardId
      );

      if (existingIndex === -1) {
        this.TurnOverRentDynamicCardDatas = [
          ...this.TurnOverRentDynamicCardDatas,
          response,
        ];
      } else {
        this.TurnOverRentDynamicCardDatas = [
          ...this.TurnOverRentDynamicCardDatas.slice(0, existingIndex),
          response,
          ...this.TurnOverRentDynamicCardDatas.slice(existingIndex + 1),
        ];
      }

      this.collectionSize = this.TurnOverRentDynamicCardDatas.length;
      this.refreshDynamicCardData();
      this.cdr.detectChanges();

      this.commentForm.reset();
    }

    if (response.sectionType === 'GurrentedSchedule') {
      const existingIndex = this.GurrentedScheduleDynamicCardDatas.findIndex(
        (field) => field.dynamicCardId === response.dynamicCardId
      );

      if (existingIndex === -1) {
        this.GurrentedScheduleDynamicCardDatas = [
          ...this.GurrentedScheduleDynamicCardDatas,
          response,
        ];
      } else {
        this.GurrentedScheduleDynamicCardDatas = [
          ...this.GurrentedScheduleDynamicCardDatas.slice(0, existingIndex),
          response,
          ...this.GurrentedScheduleDynamicCardDatas.slice(existingIndex + 1),
        ];
      }

      this.collectionSize = this.GurrentedScheduleDynamicCardDatas.length;
      this.refreshDynamicCardData();
      this.cdr.detectChanges();

      this.commentForm.reset();
    }

    if (response.sectionType == 'ServiceChargeSchedule') {
      const existingIndex =
        this.ServiceChargeScheduleDynamicCardDatas.findIndex(
          (field) => field.dynamicCardId === response.dynamicCardId
        );

      if (existingIndex === -1) {
        this.ServiceChargeScheduleDynamicCardDatas = [
          ...this.ServiceChargeScheduleDynamicCardDatas,
          response,
        ];
      } else {
        this.ServiceChargeScheduleDynamicCardDatas = [
          ...this.ServiceChargeScheduleDynamicCardDatas.slice(0, existingIndex),
          response,
          ...this.ServiceChargeScheduleDynamicCardDatas.slice(
            existingIndex + 1
          ),
        ];
      }

      this.collectionSize = this.ServiceChargeScheduleDynamicCardDatas.length;
      this.refreshDynamicCardData();
      this.cdr.detectChanges();

      this.commentForm.reset();
    }
  }

  addDataToBackend(dynamicCardData: DynamicCard): void {
    this.dynamicCardService.addDynamicCard(dynamicCardData).subscribe(
      (response) => {
        this.automaticallyAddDataInList(response);
      },
      (error: any) => {
        this.cdr.markForCheck();
        console.log('Error adding form fields:', error);
      }
    );
  }
}
