import WorkspaceSvg from "./workspace-svg";

interface HistoryEntry {
	state: any; // serialized workspace or diff
}

export default class UndoRedoHistory {
	private ws: WorkspaceSvg;
	private undoStack: HistoryEntry[] = [];
	private redoStack: HistoryEntry[] = [];
	private isRecording: boolean = true;

	constructor(ws: WorkspaceSvg) {
		this.ws = ws;
	}

	emitChange() {
		if (!this.isRecording) return;
		if (!this.ws.recordHistory) return;

		const state = this.ws.toJson ? this.ws.toJson(true) : {};
		this.undoStack.push({ state });
		this.redoStack.length = 0;

		//console.log("[emitChange] pushed state. undoStack size:", this.undoStack.length, "redoStack cleared");
	}

	undo() {
		//console.log("[undo] called. undoStack size:", this.undoStack.length, "redoStack size:", this.redoStack.length);

		if (this.undoStack.length <= 1) {
			//console.log("[undo] nothing to undo.");
			return;
		}

		const current = this.undoStack.pop();
		//console.log("[undo] popped current state:", current);

		const prev = this.undoStack[this.undoStack.length - 1];
		//console.log("[undo] previous state to restore:", prev);

		if (!prev) {
			//console.log("[undo] no previous state found.");
			return;
		}

		this.isRecording = false;
		this.ws.fromJson?.(prev.state);
		this.isRecording = true;

		this.redoStack.push(current as HistoryEntry);
		//console.log("[undo] state restored. undoStack size now:", this.undoStack.length, "redoStack size now:", this.redoStack.length);
	}

	redo() {
		//console.log("[redo] called. undoStack size:", this.undoStack.length, "redoStack size:", this.redoStack.length);

		const entry = this.redoStack.pop();
		if (!entry) {
			//console.log("[redo] nothing to redo.");
			return;
		}

		//console.log("[redo] popping state from redoStack:", entry);

		this.isRecording = false;
		this.ws.fromJson?.(entry.state);
		this.isRecording = true;

		this.undoStack.push(entry);
		//console.log("[redo] state restored. undoStack size now:", this.undoStack.length, "redoStack size now:", this.redoStack.length);
	}

	clear() {
		this.undoStack = [];
		this.redoStack = [];
		//console.log("[clear] undo and redo stacks cleared");
	}

	canUndo() {
		return this.undoStack.length > 1;
	}

	canRedo() {
		return this.redoStack.length > 0;
	}
}
